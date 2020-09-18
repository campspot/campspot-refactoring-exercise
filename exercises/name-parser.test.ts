import { NameParser } from "./name-parser";

describe('parseFirstAndLastNameFromName', () => {
  let formAddressService: NameParser = new NameParser();
  it('Should split a first and last name', () => {
    const expected = {firstName: "Zach", lastName: "Jones"};
    const result = formAddressService.parseFirstAndLastNameFromNameField("Zach Jones");
    expect(result).toEqual(expected);
  });
  it('duplicate a mononym', () => {
    const expected = {firstName: "Prince", lastName: "Prince"};
    const result = formAddressService.parseFirstAndLastNameFromNameField("Prince");
    expect(result).toEqual(expected);
  });
  it('Should append suffixes to the end of a last name', () => {
    let expected = {firstName: "Zach", lastName: "Jones Jr."};
    let result = formAddressService.parseFirstAndLastNameFromNameField("Zach Jones Jr.");
    expect(result).toEqual(expected);
    expected = {firstName: "Zach", lastName: "Jones sr"};
    result = formAddressService.parseFirstAndLastNameFromNameField("Zach Jones sr");
    expect(result).toEqual(expected);
    expected = {firstName: "Zach", lastName: "Jones IV"};
    result = formAddressService.parseFirstAndLastNameFromNameField("Zach Jones IV");
    expect(result).toEqual(expected);
    expected = {firstName: "Mari", lastName: "Mari"};
    result = formAddressService.parseFirstAndLastNameFromNameField("Mari");
    expect(result).toEqual(expected);
    expected = {firstName: "Vi", lastName: "Beauregard"};
    result = formAddressService.parseFirstAndLastNameFromNameField("Vi Beauregard");
    expect(result).toEqual(expected);
  });
  it('Should correctly split multiple names', () => {
    let expected = {firstName: "The artist formerly known as", lastName: "Prince"};
    let result = formAddressService.parseFirstAndLastNameFromNameField("The artist formerly known as Prince");
    expect(result).toEqual(expected);
    expected = {firstName: "The artist formerly known as", lastName: "Prince Jr."};
    result = formAddressService.parseFirstAndLastNameFromNameField("The artist formerly known as Prince Jr.");
    expect(result).toEqual(expected);
    expected = {firstName: "Sven, Sven, and Sven", lastName: "Jorgenson"};
    result = formAddressService.parseFirstAndLastNameFromNameField("Sven, Sven, and Sven Jorgenson");
    expect(result).toEqual(expected);
    expected = {firstName: "Maria", lastName: "del Brings Her Own Vacuum"};
    result = formAddressService.parseFirstAndLastNameFromNameField("Maria del Brings Her Own Vacuum");
    expect(result).toEqual(expected);
    expected = {firstName: "Maria", lastName: "de la Brings Her Own Vacuum"};
    result = formAddressService.parseFirstAndLastNameFromNameField("Maria de la Brings Her Own Vacuum");
    expect(result).toEqual(expected);
    expected = {firstName: "Zach", lastName: "bin Steve"};
    result = formAddressService.parseFirstAndLastNameFromNameField("Zach bin Steve");
    expect(result).toEqual(expected);
    expected = {firstName: "Santa", lastName: "St. Clause"};
    result = formAddressService.parseFirstAndLastNameFromNameField("Santa St. Clause");
    expect(result).toEqual(expected);
  });
});