import {Name} from "./name";

export class NameParser {

    private readonly suffixRegex: RegExp = new RegExp(/^(((jr|sr)?(\.)*)|(i|ii|iii|iv|v|vi|vii|viii|ix|x))$/i);
    private readonly compoundNameRegex: RegExp = new RegExp(/(^(di|del|der|mc|le|la|dela|da|o|san|ten|ter|von|ver|vonder|vande|vander|te|bon|lo|pena|el|dos|du|st|ste|den|don|mac|bin|van|de)?(\.)*$)/i);

    public getName(fullName: string): Name {
        let partsOfName = fullName.split(' ');

        if (partsOfName.length === 1) {
            return {
                first: fullName,
                last: fullName
            }
        } else if (partsOfName.length === 2) {
            return {
                first: partsOfName[0],
                last: partsOfName[1]
            }
        } else {
            let lastIndex = partsOfName.length - 1
            let splitIndex = lastIndex;

            //if we have a suffix move the split point to the index of the word before the suffix
            if (this.suffixRegex.test(partsOfName[lastIndex])) {
                splitIndex = lastIndex - 1;
            }

            //if we have a compound last name, then move the split point to the index of the first compound last name
            for (let i = 0; i < partsOfName.length - 1; i++) {
                if (this.compoundNameRegex.test(partsOfName[i])) {
                    splitIndex = i;
                    break;
                }
            }

            return {
                first: partsOfName.slice(0, splitIndex).join(' '),
                last: partsOfName.slice(splitIndex, partsOfName.length).join(' ')
            }
        }
    }
}