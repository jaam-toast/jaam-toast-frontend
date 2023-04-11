import TextField from "src/@shared/TextField";

type ITextFieldCommands = {
  installCommand: string | undefined;
  buildCommand: string | undefined;
};

function PreviewCommandsTextField({
  installCommand,
  buildCommand,
}: ITextFieldCommands) {
  return (
    <div>
      <div>
        <p>Install Command</p>
        <div>
          <TextField
            value={installCommand || ""}
            placeholder="`npm install`"
            disabled={true}
          />
        </div>
      </div>
      <div>
        <p>Build Command</p>
        <div>
          <TextField
            value={buildCommand || ""}
            placeholder="`npm run build`"
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
}

export default PreviewCommandsTextField;
