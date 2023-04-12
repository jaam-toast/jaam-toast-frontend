import { useEffect } from "react";
import { useProjectQuery } from "../ProjectDetail/useProjectQuery";
import { useNavigate, useParams } from "react-router-dom";

export function ProjectDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const { projectName } = params;
  const { data: project } = useProjectQuery(projectName!);

  useEffect(() => {
    if (!params.projectName) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div>
        <div>
          <div>
            <p>Preview</p>
          </div>
          <div>
            <div>
              <iframe
                title="jaam-toast-preview"
                src={`https://${project?.deployedUrl}`}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                sandbox="allow-scripts"
                loading="eager"
                frameBorder="0"
              />
            </div>
          </div>
          <p>{`https://${project?.deployedUrl}`}</p>
          {/* <PreviewCommandsTextField
            installCommand={project?.installCommand}
            buildCommand={project?.buildCommand}
          />
          <PreviewEnvList envsList={project?.envList} />
          <BuildingLog buildingLog={project?.buildingLog} /> */}
        </div>
      </div>
    </div>
  );
}
