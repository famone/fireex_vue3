export function stringWithFloatNumber(str: string): string{
    return str.replace(',', '.').replace(/[^.\d]/g, '').replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2")
}