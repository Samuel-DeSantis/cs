export const fill = (cable, conduit) => {
  const cable_area = (cable.count * Area.diameter(cable.od))
  const conduit_area = Area.diameter(conduit.id)
  return parseFloat(((cable_area / conduit_area) * 100).toFixed(2))
}

const Area = {
  radius: (measurement) => {
    return (measurement) ** 2 * Math.PI
  },
  diameter (measurement) {
    return (measurement / 2) ** 2 * Math.PI
  }
}

// console.log(fill({ count: 3, od: 0.546 }, { id: 1.913 })) // Example usage, should return 0.5