export type ButtonType = {
   text?: string;
   onClick?: () => void;
   type?: "primary" | "secondary";
   version?: "one" | "two";
}