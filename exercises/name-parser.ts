export class NameParser {

    private readonly suffixRegex: RegExp = new RegExp(/^(((jr|sr)?(\.)*)|(i|ii|iii|iv|v|vi|vii|viii|ix|x))$/i);
    private readonly compoundNameRegex: RegExp = new RegExp(/(^(di|del|der|mc|le|la|dela|da|o|san|ten|ter|von|ver|vonder|vande|vander|te|bon|lo|pena|el|dos|du|st|ste|den|don|mac|bin|van|de)?(\.)*$)/i);

    public parseFirstAndLastNameFromNameField(name: string): firstAndLastName {
        let firstName: string;
        let lastName: string;
        const partsOfName = name.trim().split(' ');
        let suffix: string = null;
        if (this.suffixRegex.test(partsOfName[partsOfName.length - 1])) {
          suffix = partsOfName[partsOfName.length - 1];
          partsOfName.pop();
        }
        firstName = partsOfName[0];
        lastName = partsOfName[partsOfName.length - 1];
        if (partsOfName.length > 2) {
          partsOfName.pop();
          let isCompoundLastName = false;
          for (let i = 1; i < partsOfName.length; i++) {
            if (this.compoundNameRegex.test(partsOfName[i])) {
              isCompoundLastName = true;
            }
            if (isCompoundLastName) {
              for (let y = partsOfName.length - 1; y >= i; y--) {
                lastName = `${partsOfName[y]} ${lastName}`;
              }
              partsOfName.splice(i, partsOfName.length - i);
              break;
            }
          }
          firstName = partsOfName.join(' ');
        }
        if (suffix) {
          lastName += ` ${suffix}`;
        }
        return {
          firstName: firstName,
          lastName: lastName
        };
      }
}

export class firstAndLastName {
    firstName: String;
    lastName: String;
}