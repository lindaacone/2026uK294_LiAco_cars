type ErrorTextProps = {
  children: React.ReactNode;
};

export default function ErrorText({ children }: ErrorTextProps) {
  return <div className="error">{children}</div>;
}