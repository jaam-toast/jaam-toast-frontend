type BuildingLogProps = {
  buildingLog?: string[];
};

export function BuildingLog({ buildingLog }: BuildingLogProps) {
  return (
    <div>
      <div id="panel1a-header">
        <p>Building Log</p>
      </div>
      <div>
        <div>
          {buildingLog?.map((log, i) => (
            <p>{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
