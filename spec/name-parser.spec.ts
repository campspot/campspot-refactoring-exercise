import { NameParser } from "../src/name-parser";

let nameParser = new NameParser();

describe('parseFirstAndLastNameFromName', () => {
  describe('Simple Cases', () => {
    it('Should split a first and last name', () => {
        const expected = {firstName: "Zach", lastName: "Jones"};
        const result = nameParser.getFirstAndLastName("Zach Jones");
        expect(result).toEqual(expected);
    });
    it('duplicate a mononym', () => {
        const expected = {firstName: "Prince", lastName: "Prince"};
        const result = nameParser.getFirstAndLastName("Prince");
        expect(result).toEqual(expected);
    });
  })

  describe('Suffixes', () => {
      it(`should add 'Jr.' to the end of the last name`, () => {
          const expected = {firstName: "Zach", lastName: "Jones Jr."};
          const result = nameParser.getFirstAndLastName("Zach Jones Jr.");
          expect(result).toEqual(expected);
      });
      it(`should add 'sr' to the end of the last name`, () => {
          const expected = {firstName: "Zach", lastName: "Jones sr."};
          const result = nameParser.getFirstAndLastName("Zach Jones sr.");
          expect(result).toEqual(expected);
      });
      it(`should add 'Sr.' to the end of the last name`, () => {
          const expected = {firstName: "Zach", lastName: "Jones Sr."};
          const result = nameParser.getFirstAndLastName("Zach Jones Sr.");
          expect(result).toEqual(expected);
      });
      it(`should add 'IV' to the end of the last name`, () => {
          const expected = {firstName: "Zach", lastName: "Jones IV"};
          const result = nameParser.getFirstAndLastName("Zach Jones IV");
          expect(result).toEqual(expected);
      });
  });

  describe('Compound Names', () => {
      it(`should translate "The artist formerly known as Prince" to {first: "The artist formerly known as", last: "Prince"}`, () => {
          const expected = {firstName: "The artist formerly known as", lastName: "Prince"};
          const result = nameParser.getFirstAndLastName("The artist formerly known as Prince");
          expect(result).toEqual(expected);
      });
      it(`should translate "The artist formerly known as Prince Jr." to {firstName: "The artist formerly known as", lastName: "Prince Jr."}`, () => {
          const expected = {firstName: "The artist formerly known as", lastName: "Prince Jr."};
          const result = nameParser.getFirstAndLastName("The artist formerly known as Prince Jr.");
          expect(result).toEqual(expected);
      });
      it(`should translate "Sven, Sven, and Sven Jorgenson" to {firstName: "The artist formerly known as", lastName: "Prince}`, () => {
          const expected = {firstName: "Sven, Sven, and Sven", lastName: "Jorgenson"};
          const result = nameParser.getFirstAndLastName("Sven, Sven, and Sven Jorgenson");
          expect(result).toEqual(expected);
      });
      it(`should translate "Maria - Brings Her Own Vacuum" to {firstName: "Maria - Brings Her Own", lastName: "Vacuum"} (This is a real production case)`, () => {
          const expected = {firstName: "Maria - Brings Her Own", lastName: "Vacuum"};
          const result = nameParser.getFirstAndLastName("Maria - Brings Her Own Vacuum");
          expect(result).toEqual(expected);
      });
      it(`should translate "Angel del Mar" to {firstName: "Angel", lastName: "del Mar"}`, () => {
          const expected = {firstName: "Angel", lastName: "del Mar"};
          const result = nameParser.getFirstAndLastName("Angel del Mar");
          expect(result).toEqual(expected);
      });
      it(`should translate "Carlos de la Cruz" to {firstName: "Carlos", lastName: "de la Cruz"}`, () => {
          const expected = {firstName: "Carlos", lastName: "de la Cruz"};
          const result = nameParser.getFirstAndLastName("Carlos de la Cruz");
          expect(result).toEqual(expected);
      });
      it(`should translate "Zach bin Steve" to {firstName: "Zach", lastName: "bin Steve"}`, () => {
          const expected = {firstName: "Zach", lastName: "bin Steve"};
          const result = nameParser.getFirstAndLastName("Zach bin Steve");
          expect(result).toEqual(expected);
      });
      it(`should translate "Santa St. Clause" to {firstName: "Santa", lastName: "St. Clause"}`, () => {
          const expected = {firstName: "Santa", lastName: "St. Clause"};
          const result = nameParser.getFirstAndLastName("Santa St. Clause");
          expect(result).toEqual(expected);
      });
  });
});