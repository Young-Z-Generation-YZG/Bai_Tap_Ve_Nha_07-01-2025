import { Control } from "react-hook-form";
import type { TextInputProps } from "react-native/Libraries/Components/TextInput/TextInput";

interface InputProps extends TextInputProps {
  name: string;
  control: Control<any>;
  error?: FieldError;
}
