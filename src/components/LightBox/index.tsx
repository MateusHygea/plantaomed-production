import React, { useState } from "react";
import { Content, ContentImage, Icon } from "./styles";

interface LightBoxProps {
  children: React.ReactNode,
  src?: string, 
  alt?: string,
}

export function LightBox({children, src, alt} : LightBoxProps) {
 
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Content onClick={toggleIsOpen}>
      {children}
      {isOpen && !!src ?
        <ContentImage onClick={toggleIsOpen}>
          <Icon src={src}
            alt={alt}
          />
        </ContentImage>
        : null}
    </Content>
  );
};