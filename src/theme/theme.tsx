import { PropsWithChildren, useEffect, useMemo } from "react";
import { createTheme, CssBaseline, ThemeProvider as MUIThemeProvider } from "@mui/material";
import * as muiLocales from "@mui/material/locale";
import { componentsOverrides } from "@theme/overrides/componentsOverrides";
import { palette } from './overrides/palette';
import { appFonts, typography } from './overrides/typography';
import { useConfig } from "@hooks/useConfig.ts";
import { scrollbar } from "@theme/overrides/scrollbar";
import { RtlProvider } from "@theme/RtlProvider.tsx";

export const locales = muiLocales;

export const ThemeProvider = ({children}: PropsWithChildren) => {
  const [{paletteMode, rtl, locale}] = useConfig();

  const theme = useMemo(() => createTheme({
    palette: palette[paletteMode],
    direction: rtl ? 'rtl' : 'ltr',
    typography
  }, locales[locale]), [locale, paletteMode, rtl]);

  theme.components = {
    MuiCssBaseline: {
      styleOverrides: `
        ${scrollbar({thickness: '10px', radius: '10px', trackColor: '#f5f5f5', thumbColor: '#949494'})};
        ${appFonts}
      `
    },
    ...componentsOverrides(theme)
  };

  useEffect(() => {
    document.documentElement.setAttribute("dir", rtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute("lang", locale.substring(0, 2));
  }, [rtl, locale]);

  return (
      <MUIThemeProvider theme={theme}>
        <RtlProvider>
          <CssBaseline/>
          {children}
        </RtlProvider>
      </MUIThemeProvider>
  );
}
