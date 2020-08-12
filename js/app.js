const OPTIONS = document.getElementById('options')
const INPUT1 = document.getElementById('input-row-col1')
const INPUT2 = document.getElementById('input-row-col2')
const MATRIX1 = document.getElementById('matrix1')
const MATRIX2 = document.getElementById('matrix2')
const SUBMIT = document.getElementById('submit')
const RESULT = document.getElementById('result')
const ADD = 'Add'
const MULTIPLY = 'Multiply'
const DETERMINANT = 'Determinant'
const COFACTOR = 'Cofactor'
const ROWS_OF_A = 'rows-of-input-row-col1'
const COLS_OF_A = 'cols-of-input-row-col1'
const ROWS_OF_B = 'rows-of-input-row-col2'
const COLS_OF_B = 'cols-of-input-row-col2'
const CALCULATE = 'calculate'

function clearAll() {
    clear(RESULT)
    clear(MATRIX1)
    clear(MATRIX2)
    clear(INPUT1)
    clear(INPUT2)
    clear(SUBMIT)
}

function clearSecond() {
    clear(SUBMIT)
    clear(INPUT2)
    clear(RESULT)
    clear(MATRIX1)
    clear(MATRIX2)
}

function Multiply(m1, m2) {
    let product = []
    for (let i = 0; i < m1.length; i++) {
        product[i] = []
        for (let j = 0; j < m2[0].length; j++) {
            let temp = 0
            for (let k = 0; k < m2.length; k++) {
                temp += m1[i][k] * m2[k][j]
            }
            product[i][j] = temp
        }
    }
    return product
}

function Add(m1, m2) {
    let sum = []
    for (let i = 0; i < m1.length; i++) {
        sum[i] = []
        for (let j = 0; j < m1[0].length; j++) {
            sum[i][j] = m1[i][j] + m2[i][j]
        }
    }
    return sum
}

function generateInput(selector, min = 1, max = 10) {
    while (min <= max) {
        let option = document.createElement('option')
        option.value = min.toString()
        option.text = min.toString()
        selector.append(option)
        min++
    }
}

function generateMatrix(input, min = 1, max = 10) {
    generateRowCol(input)
    generateInput(document.getElementById('rows-of-' + input.id), min, max)
    generateInput(document.getElementById('cols-of-' + input.id), min, max)
    let button = document.createElement('button')
    button.id = 'next-' + input.id
    button.textContent = 'Next'
    input.append(button)
}

function clear(input) {
    while (input.firstChild) input.removeChild(input.firstChild)
}

function generateMatrixInput(row, col, div) {
    for (let n = 1; n <= row; n++) {
        let row_div = document.createElement('div')
        row_div.id = div.id + '_' + 'row_' + n
        div.append(row_div)
    }

    for (let n = 1; n <= row; n++) {
        for (let m = 1; m <= col; m++) {
            let textField = document.createElement('input')
            textField.type = 'number'
            textField.value = '0'
            document.getElementById(div.id + '_' + 'row_' + n).append(textField)
        }
    }
}

function generateSubmit(text) {
    let calculate = document.createElement('button')
    calculate.innerText = text
    calculate.id = 'calculate'
    SUBMIT.append(calculate)
}

function cofactor(m, row, col) {
    let rows = m.length
    let columns = m[0].length
    let k = 0
    let values = []
    for (let i = 0; i < rows; i++) {
        if (i === row) continue
        let l = 0
        values[k] = []
        for (let j = 0; j < columns; j++) {
            if (j === col) continue
            values[k][l++] = m[i][j]
        }
        k++
    }
    return values
}

function determinant(m) {
    if (m.length === 1 && m[0].length === 1) return m[0][0]

    if (m.length === 2) {
        return m[0][0] * m[1][1] - m[0][1] * m[1][0]
    }

    let result = 0
    for (let i = 0; i < m.length; i++) {
        result += m[0][i] * determinant(cofactor(m, 0, i)) * Math.pow(-1, i)
    }
    return result
}

function to2DArray(div, row, col) {
    let values_of_m = []
    let m = []
    for (let i = 1; i <= row; i++) {
        let row_of_m = document
            .getElementById(div.id + '_' + 'row_' + i)
            .getElementsByTagName('input')
        for (let j = 0; j < row_of_m.length; j++) {
            values_of_m.push(parseInt(row_of_m[j].value))
        }
    }
    while (values_of_m.length) m.push(values_of_m.splice(0, col))
    return m
}

function matrixToString(m) {
    let result = ''
    for (let i = 0; i < m.length; i++) {
        result += m[i].toString().replace(/,/gi, ' ') + '\n'
    }
    return result
}

function generateRowCol(div) {
    let row = document.createElement('select')
    let col = document.createElement('select')
    row.setAttribute('id', 'rows-of-' + div.id)
    col.setAttribute('id', 'cols-of-' + div.id)
    div.append(row, col)
}

OPTIONS.addEventListener('change', () => {
        clearAll()

        /*
            ADD
             */

        if (OPTIONS.value === ADD) {
            generateMatrix(INPUT1)
            document.getElementById('next-' + INPUT1.id).onclick = () => {
                clearSecond()
                generateRowCol(INPUT2)
                let rowsA = document.getElementById(ROWS_OF_A).value
                let colsA = document.getElementById(COLS_OF_A).value

                let option = document.createElement('option')
                option.value = document.getElementById(ROWS_OF_A).value
                option.text = document.getElementById(ROWS_OF_A).value
                document.getElementById(ROWS_OF_B).append(option)
                option = document.createElement('option')
                option.value = document.getElementById(COLS_OF_A).value
                option.text = document.getElementById(COLS_OF_A).value
                document.getElementById(COLS_OF_B).append(option)

                generateMatrixInput(rowsA, colsA, MATRIX1)
                generateMatrixInput(rowsA, colsA, MATRIX2)

                generateSubmit('Add')

                document.getElementById(CALCULATE).onclick = () => {
                    clear(RESULT)
                    let m1 = to2DArray(
                        MATRIX1,
                        document.getElementById(ROWS_OF_A).value,
                        document.getElementById(COLS_OF_A).value,
                    )
                    let m2 = to2DArray(
                        MATRIX2,
                        document.getElementById(ROWS_OF_B).value,
                        document.getElementById(COLS_OF_B).value,
                    )
                    let output = document.createElement('textarea')
                    output.append(matrixToString(matrixToString(Add(m1, m2))))
                    RESULT.append(output)

                }
            }
        }

        /*
            MULTIPLY
             */
        if (OPTIONS.value === MULTIPLY) {
            generateMatrix(INPUT1)

            document.getElementById('next-' + INPUT1.id).onclick = () => {
                clearSecond()
                document.getElementById('next-' + INPUT1.id).innerText = 'Refresh'

                let rowsA = document.getElementById(ROWS_OF_A).value
                let colsA = document.getElementById(COLS_OF_A).value

                generateRowCol(INPUT2)
                generateInput(document.getElementById(COLS_OF_B), 1, 10)

                let option = document.createElement('option')
                option.value = colsA
                option.text = colsA
                document.getElementById(ROWS_OF_B).append(option)

                let button = document.createElement('button')
                button.setAttribute('id', 'next2')
                button.textContent = 'Next'
                INPUT2.append(button)

                generateMatrixInput(rowsA, colsA, MATRIX1)

                button.onclick = () => {
                    clear(MATRIX2)
                    clear(SUBMIT)

                    let rowsB = document.getElementById(ROWS_OF_B).value
                    let colsB = document.getElementById(COLS_OF_B).value

                    button.textContent = 'Refresh'
                    generateMatrixInput(rowsB, colsB, MATRIX2)

                    generateSubmit('Multiply')
                    document.getElementById(CALCULATE).onclick = () => {
                        clear(RESULT)
                        let m1 = to2DArray(MATRIX1, rowsA, colsA)
                        let m2 = to2DArray(MATRIX2, rowsB, colsB)
                        let output = document.createElement('textarea')
                        output.append(matrixToString(Multiply(m1, m2)))
                        RESULT.append(output)

                    }
                }
            }
        }

        /**
         * Cofactor
         */

        if (OPTIONS.value === COFACTOR) {
            generateMatrix(INPUT1, 2)
            document.getElementById('next-' + INPUT1.id).onclick = () => {
                clear(MATRIX1)
                clear(INPUT2)
                clear(SUBMIT)

                let rowsA = document.getElementById(ROWS_OF_A).value
                let colsA = document.getElementById(COLS_OF_A).value

                generateMatrixInput(rowsA, colsA, MATRIX1)

                generateRowCol(INPUT2)

                let rowsB = document.getElementById(ROWS_OF_B).value
                let colsB = document.getElementById(COLS_OF_B).value

                generateInput(document.getElementById(ROWS_OF_B), 1, rowsA)
                generateInput(document.getElementById(COLS_OF_B), 1, colsA)
                generateSubmit('get cofactor')

                document.getElementById(CALCULATE).onclick = () => {
                    let m = to2DArray(MATRIX1, rowsA, colsA)
                    let output = document.createElement('textarea')
                    output.append(matrixToString(cofactor(m, rowsB - 1, colsB - 1)))
                    RESULT.append(output)
                }
            }
        }
        /*
            DETERMINANT
             */
        if (OPTIONS.value === DETERMINANT) {
            let selector = document.createElement('select')
            selector.id = ROWS_OF_A
            selector.setAttribute('id', ROWS_OF_A)
            generateInput(selector)

            let button = document.createElement('button')
            button.innerText = 'Next'

            let selector2 = document.createElement('select')
            selector2.id = COLS_OF_A
            INPUT1.append(selector, selector2, button)

            button.onclick = () => {
                clear(MATRIX1)
                clear(selector2)
                clear(SUBMIT)
                let rowsA = document.getElementById(ROWS_OF_A).value

                let option = document.createElement('option')
                option.value = rowsA
                option.text = rowsA
                selector2.append(option)

                let colsA = document.getElementById(COLS_OF_A).value

                generateMatrixInput(rowsA, colsA, MATRIX1)
                generateSubmit('get determinant')

                document.getElementById(CALCULATE).onclick = () => {
                    clear(RESULT)
                    let output = document.createElement('textarea')
                    output.append(matrixToString(to2DArray(MATRIX1, rowsA, colsA)))
                    RESULT.append(output)
                }
            }


        }
    },
)
