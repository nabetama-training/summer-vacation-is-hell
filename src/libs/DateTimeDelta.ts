import { DateTime } from "luxon";

const delta = (start :string, end :string):number =>{
    const a = DateTime.fromISO(start)
    const b = DateTime.fromISO(end)

    return b.diff(a, 'days').days
}

export {delta}