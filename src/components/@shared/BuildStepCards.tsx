type BuildStepCardProps = {
  step: number;
};

function BuildStepCard({ step }: BuildStepCardProps) {
  return (
    <div>
      <div>
        {1}
        {"Select Git Repository"}
        {"Import an existing Git Repository"}
      </div>
      <div>
        {2}
        {"Configure Project"}
        {"Configure your Project"}
      </div>
      <div>
        {3}
        {"Deploy"}
        {"Deploy it"}
      </div>
    </div>
  );
}

export default BuildStepCard;
