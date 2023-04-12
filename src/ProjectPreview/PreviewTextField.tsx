import { TextField } from "../@shared";
import { BLACK } from "src/@config/colors";
import { Env } from "types/build";

type PreviewTextFieldProps = {
  envIndex: number;
  envsList: Env[];
};

function PreviewTextField({ envIndex, envsList }: PreviewTextFieldProps) {
  return (
    <div>
      <div>
        <TextField value={envsList[envIndex].key} disabled />
      </div>
      <div>
        <TextField
          style={{ color: BLACK }}
          value={envsList[envIndex].value}
          disabled
        />
      </div>
    </div>
  );
}

export default PreviewTextField;
