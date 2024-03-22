"use server";

interface enemyProps {
  id: string
}

function Enemy({ id }: enemyProps) {
  const [enemy, setEnemy] 
  const enemy = fetch(`/enemies/${id}`)
  return <p>{enemy.id}</p>
}
