export function selectCarModel(model: string, vehicle_refined_make: string): string {
  if (model === "another_vehicle") {
    return vehicle_refined_make;
  }

  return model;
}