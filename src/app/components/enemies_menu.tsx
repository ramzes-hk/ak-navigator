"use client";
import { getEnemyColumns } from "./columns";
import OpTable from "./op_list";
import { enemyMenuProps } from "@/lib/enemies";

function EnemiesMenu({ ids, route }: enemyMenuProps) {
  return (
    <div className="px-4 sm:container w-full flex flex-col sm:flex-row item-start">
      <div className="sm:w-1/6">
        <aside className="sm:sticky sm:top-20 sm:block sm:z-40 w-full">
          <h2 className="pb-2 text-xl">Filters</h2>
        </aside>
      </div>
      <main className="w-full sm:w-5/6 sm:h-full">
        <div className="w-full sm:w-4/5 m-auto pb-4">
          <OpTable
            columns={getEnemyColumns(route)}
            data={ids}
            title={"Enemy List"}
          />
        </div>
      </main>
    </div>
  );
}

export default EnemiesMenu;
