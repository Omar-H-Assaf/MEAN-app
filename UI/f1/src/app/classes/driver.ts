import { FormGroup } from "@angular/forms";

export class Driver {
    #_id!: string;
    #driverName!: string;
    #driverNumber!: number;
    #country!: string;
    #podiums!: number;
    #points!: number;
    #grandsPrixEntered!: number;
    #worldChampionships!: number;
    get _id() { return this.#_id };
    get driverName() { return this.#driverName }
    set driverName(driverName: string) { this.#driverName = driverName }
    get driverNumber() { return this.#driverNumber }
    set driverNumber(driverNumber: number) { this.#driverNumber = driverNumber }
    get country() { return this.#country }
    set country(country: string) { this.#country = country }
    get podiums() { return this.#podiums }
    set podiums(podiums: number) { this.#podiums = podiums }
    get points() { return this.#points }
    set points(points: number) { this.#points = points }
    get grandsPrixEntered() { return this.#grandsPrixEntered }
    set grandsPrixEntered(grandsPrixEntered: number) { this.#grandsPrixEntered = grandsPrixEntered }
    get worldChampionships() { return this.#worldChampionships }
    set worldChampionships(worldChampionships: number) { this.#worldChampionships = worldChampionships }

    fillFromFormGroup(form: FormGroup) {
        this.#driverName = form.value.driverName;
    }

    toJSON(): {} {
        return {
            driverName: this.#driverName,
        }
    }
}