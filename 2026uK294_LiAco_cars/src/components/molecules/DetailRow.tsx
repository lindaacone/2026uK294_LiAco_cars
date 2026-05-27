type DetailRowProps = {
  label: string;
  value?: string | number;
};

export default function DetailRow({ label, value }: DetailRowProps) {
  return (
    <p>
      {label}: {value ?? "-"}
    </p>
  );
}