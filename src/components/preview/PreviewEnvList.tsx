import TextFieldPreview from "./PreviewTextField";
import { Env } from "types/build";

function PreviewEnvList({ envsList }: { envsList?: Env[] }) {
  return (
    <div>
      <div>
        <p>Environment Variable</p>
      </div>
      <ul>
        {envsList?.map((env, index) => (
          <li key={`${env.key}-${index}`}>
            <TextFieldPreview envIndex={index} envsList={envsList} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PreviewEnvList;
