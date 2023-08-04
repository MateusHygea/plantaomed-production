import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

import { firebase } from "../service/DB";
import { toast } from "react-toastify";

type User = firebase.User | undefined;

type AuthContextFirebase = {
  user: User;
  login: (data: SignInFirebase) => Promise<void>;
  signUp: (data : SignUpFirebase) => Promise<void>
  logout: () => Promise<void>;
  viewPonto: boolean | null | undefined;
};

type ChildrenProps = {
  children: ReactNode;
};

export interface SignInFirebase {
  email: string;
  password: string;
}

type UserProps = {
  confirmPassword: string;
  email: string;
  isViewPonto: boolean;
  name: string;
  password: string;
};

interface SignUpFirebase {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const AuthContext = createContext({} as AuthContextFirebase);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [data, setData] = useState<User>();
  const [view, setView] = useState<boolean | null>();

  const loadStorage = useCallback(async () => {
    try {
      const storageUser = await localStorage.getItem("user");
      const storageViewPonto = await localStorage.getItem("@viewponto");
      if (storageUser) {
        setData(JSON.parse(storageUser));
      }
      if (storageViewPonto) {
        setView(JSON.parse(storageViewPonto));
      }
    } catch (error) {
      logout();
      console.error("Error", error);
    }
  }, [setData]);

  useEffect(() => {
    loadStorage();
  }, [loadStorage]);

  async function storageViewPonto(data: boolean) {
    try {
      await localStorage.setItem("@viewponto", JSON.stringify(data));
    } catch (error) {
      console.error("Error", error);
    }
  }

  async function storageUser(data: User) {
    try {
      await localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Error", error);
    }
  }

  async function getDocs(data: SignInFirebase): Promise<string | void> {
    return new Promise<string | void>((resolve, reject) => {
      var db = firebase.firestore();
      var itemsRef = db.collection("_USERS").where("email", "==", data.email);
      itemsRef.onSnapshot((querySnapshot) => {
        const docs: any = querySnapshot.docs.map((doc) => doc.data() as UserProps);
        setUser(docs);
        if (docs.length > 0 && docs[0].isViewPonto) {
          storageViewPonto(docs[0].isViewPonto);
          setView(docs[0].isViewPonto);
          setUser(docs[0].name);
        } else {
          resolve();
        }
      });
    });
  }
  
  async function signUp(data: SignUpFirebase) {
    if (
      data.name === "" ||
      data.email === "" ||
      data.password == "" ||
      data.confirmPassword === ""
    ) {
      toast.warning("Preenche os dados!");
      return;
    }
    await firebase
      .auth()
      .fetchSignInMethodsForEmail(data.email)
      .then((valdiate) => {
        if (valdiate && valdiate.length > 0) {
          toast.error("Usuário já cadastrado no sistema");
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(async (value) => {
              const _collectionRefUser = firebase
                .firestore()
                .collection("_USERS");
              //guardando uid do usuário//
              let uid = value.user?.uid;
              await _collectionRefUser
                .doc(uid)
                .set({
                  name: data.name,
                  email: data.email,
                  password: data.password,
                  confirmPassword: data.confirmPassword,
                })
                .then(() => {
                  setUser({
                    name: data.name,
                    email: data.email,
                  });
                  toast.success("Usuário cadastrado com sucesso!");
                  console.log("cadastrado com sucesso");
                  //Limpando os campos preenchidos
                  //setName("");
                  //setEmail("");
                  //setPassword("");
                  //setConfirmPassword("");
                });
            })
            .catch((err) => {
              console.log(err, "erro ao cadastrar um usuário");
            });
        }
      })
      .catch((err) => {
        console.log("erro", err);
        console.log(err, "erro ao cadastrar um usuário");
      });
  }

  async function login(data: SignInFirebase) {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
      const user: any = userCredential.user as User;
      await getDocs(data);
      storageUser(user);
      setData(user);
      setUser(user)
      toast.success("Bem vindo ao JPonto Med 👨‍⚕️");
    } catch (error) {
      console.log(error, "ERRO NO LOGIN");
      toast.error("Ops! erro ao fazer login...");
    }
  }

  async function logout() {
    localStorage.clear();
    setView(false);
  }

  const value: AuthContextFirebase = {
    user: data,
    login,
    signUp,
    logout,
    viewPonto: view,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
