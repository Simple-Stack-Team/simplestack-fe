import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
    children: string;
}

const AlertMessage = ({ children }: Props) => {
    return (
        <Alert variant="destructive" className="max-w-[400px] mx-auto mb-8">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{children}</AlertDescription>
        </Alert>
    );
};

export default AlertMessage;
