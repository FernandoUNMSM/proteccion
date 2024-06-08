import { formatNumber, formatToDecimal } from "@/utilities/formatters";

describe("Procesos Servicios", () => {
  it("formatNumber", async () => {
    formatNumber(123, "decimal");
  });
  it("formatToDecimal", async () => {
    formatToDecimal(123);
  });
});
