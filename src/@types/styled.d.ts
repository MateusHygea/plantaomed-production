import styled from "styled-components";
import theme from "../global/Theme"

declare module "styled-components" {
    type ThemeType = typeof theme

    export interface DefaultTheme extends ThemeType {}
}