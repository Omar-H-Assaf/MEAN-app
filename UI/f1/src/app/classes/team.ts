import { FormGroup } from "@angular/forms";
import { Driver } from "./driver";

export class Team {
    #_id!: string;
    #teamName!: string;
    #teamCheif!: string;
    #powerUnit!: string;
    #firstTeamEntry!: number;
    #worldChampions!: number;
    #polePosiotion!: number;
    #fastestLaps!: number;
    #fullTeamName!: string;
    #teamcolor!: string;
    #drivers!: Driver[];
    #carImage!: string;

    get _id() { return this.#_id };
    get teamName() { return this.#teamName }
    set teamName(teamName: string) { this.#teamName = teamName }
    get teamCheif() { return this.#teamCheif }
    set teamCheif(teamCheif: string) { this.#teamCheif = teamCheif }
    get powerUnit() { return this.#powerUnit }
    set powerUnit(powerUnit: string) { this.#powerUnit = powerUnit }
    get firstTeamEntry() { return this.#firstTeamEntry }
    set firstTeamEntry(firstTeamEntry: number) { this.#firstTeamEntry = firstTeamEntry }
    get worldChampions() { return this.#worldChampions }
    set worldChampions(worldChampions: number) { this.#worldChampions = worldChampions }
    get polePosiotion() { return this.#polePosiotion }
    set polePosiotion(polePosiotion: number) { this.#polePosiotion = polePosiotion }
    get fastestLaps() { return this.#fastestLaps }
    set fastestLaps(fastestLaps: number) { this.#fastestLaps = fastestLaps }
    get fullTeamName() { return this.#fullTeamName }
    set fullTeamName(fullTeamName: string) { this.#fullTeamName = fullTeamName }
    get teamcolor() { return this.#teamcolor }
    set teamcolor(teamcolor: string) { this.#teamcolor = teamcolor }
    get carImage() { return this.#carImage }
    set carImage(carImage: string) { this.#carImage = carImage }
    get drivers() { return this.#drivers }
    set drivers(drivers: Driver[]) { this.#drivers = drivers}

    fillFormGroup(form: FormGroup) {
        this.teamName = form.value.teamName;
        this.teamCheif = form.value.teamCheif;
        this.powerUnit = form.value.powerUnit;
        this.firstTeamEntry = form.value.firstTeamEntry;
        this.worldChampions = form.value.worldChampions;
        this.polePosiotion = form.value.polePosiotion;
        this.fastestLaps = form.value.fastestLaps;
        this.fullTeamName = form.value.fullTeamName;
        this.teamcolor = form.value.teamcolor;
    }
}