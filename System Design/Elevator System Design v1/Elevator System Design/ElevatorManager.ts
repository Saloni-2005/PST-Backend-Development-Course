import { ClosestElevatorSelector } from "./ClosestElevatorSelector.js";
import { Elevator } from "./Elevator.js";
import type { ElevatorRequest } from "./ElevatorRequest.js";
import type { IElevatorSelector } from "./IElevatorSelector.js";

export class ElevatorManager{
    // best elevator
    numFloors : number;
    elevators: Elevator[];
    selector: IElevatorSelector;

    constructor(numFloors: number, numElevators: number){
        this.numFloors = numFloors;
        this.selector = new ClosestElevatorSelector();
        this.elevators = [];
        
        // Task: 
       
    }

    updateDisplay(): void{
        for(const elevator of this.elevators){
            elevator.updateDisplay();
        }
    }

    requestElevator(request: ElevatorRequest): Elevator | null{
        // Task: 
       
        if(elevator){
            // pick up
            // Task

            // drop off
            elevator.enqueueFloor(request.destinationFloor);
        } else {
            console.log(`No elevator is available`);
        }

        return elevator;
    }
}