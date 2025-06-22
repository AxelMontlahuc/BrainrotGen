import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import Link from "next/link";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex justify-center items-center border-white">
        <NavigationMenu className="w-[1000px]">
              <NavigationMenuList className="mt-[20px] pr-[50px] pl-[50px] w-[600px] flex justify-between dark:bg-input/70 rounded-md">
                <NavigationMenuItem>
                  <NavigationMenuLink className="items-center" asChild>
                    <Link href="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="items-center" asChild>
                  <Link href="/italian">Italian Brainrot</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="items-center" asChild>
                  <Link href="/subwaysurfer">Subway Surfer Brainrot</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="items-center" asChild>
                    <Link href="/docs">Learn More</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
      </div>
      
      <Component {...pageProps} />
    </ThemeProvider>
  );
}