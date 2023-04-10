import { GetServerSideProps } from "next";

import BuildingLog from "src/components/@shared/BuildingLog";
import PreviewCommandsTextField from "src/components/Preview/PreviewCommandsTextField";
import PreviewEnvList from "src/components/Preview/PreviewEnvList";
import { BLUE } from "src/config/colors";
import getUserFromCookie from "utils/getUserFromCookie";

import deployMockData from "../../../../../__test__/mock/deployData.json";

function PreviewPage() {
  // * test mock 데이터 적용 (위 deploymentData로 바꾸면 됨)
  const deploymentDataTest = deployMockData;

  const {
    buildingLog: curBuildingLog,
    envList,
    installCommand,
    buildCommand,
    deployedUrl,
  } = deploymentDataTest[deploymentDataTest.length - 1];

  return (
    <div>
      <div>
        <p>Congratulations!</p>
        <p>You just deployed a new Project to Vercel.</p>
      </div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <iframe
                      title="jaam-toast-preview"
                      src={`https://${deployedUrl as string}`}
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
                <a
                  href={`https://${deployedUrl as string}`}
                  style={{ color: BLUE, textDecoration: "none" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p>{`https://${deployedUrl as string}`}</p>
                </a>
                <PreviewCommandsTextField
                  installCommand={installCommand}
                  buildCommand={buildCommand}
                />
                <PreviewEnvList envsList={envList} />
                <BuildingLog buildingLog={curBuildingLog || []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async context => {
  const user = getUserFromCookie(context);

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const IframeBoxStyle = {
  position: "relative",
  width: "100%",
  height: 0,
  paddingBottom: "56.25%",
};

const IframeStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  left: 0,
  top: 0,
};

export default PreviewPage;
