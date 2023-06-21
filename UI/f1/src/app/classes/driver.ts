import { FormGroup } from "@angular/forms";

export class Driver {
    #_id!: string;
    #driverName!: string;
    #driverNumber!: number;
    #country!: string;
    #driverImage!: string;
    #driverMainImage!: string;
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
    get driverImage() { return this.#driverImage }
    set driverImage(driverImage: string) { this.#driverImage = driverImage }
    get driverMainImage() { return this.#driverMainImage }
    set driverMainImage(driverMainImage: string) { this.#driverMainImage = driverMainImage }
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
        this.#driverNumber = form.value.driverNumber;
        this.#country = form.value.country;
        this.#driverNumber = form.value.driverNumber;
        this.#country = form.value.country;
        this.#podiums = form.value.podiums;
        this.#points = form.value.points;
        this.#grandsPrixEntered = form.value.grandsPrixEntered;
        this.#worldChampionships = form.value.worldChampionships;
        this.#driverImage = form.value.driverImage;
        this.#driverMainImage = form.value.driverMainImage;
    }
}