import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import Link from "next/link";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex justify-center items-center border-b-1 border-white">
        <NavigationMenu className="m-[20px]">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className="items-center" asChild>
                    <Link className="w-[100px]" href="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="items-center" asChild>
                  <Link className="w-[100px]" href="/generate">Generate</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="items-center" asChild>
                    <Link className="w-[100px]" href="/docs">Learn More</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
      </div>
      
      <Component {...pageProps} />
    </ThemeProvider>
  );
}