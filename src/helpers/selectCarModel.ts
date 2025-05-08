export function selectCarModel(model: string, vehicle_refined_make: string): string {
  console.log("model");
  console.log(model);
  console.log("vehicle_refined_make");
  console.log(vehicle_refined_make);
  if (model === "another_vehicle" || model === "Другое ТС") {
    return vehicle_refined_make;
  }

  return model;
}
