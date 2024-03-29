import { styleWithFlexForInner } from '../helper'
const category = 'Inner Blocks'

const styleRow = `
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: nowrap;`

const step = 1
const minDim = 1
const currentUnit = 1
const resizerBtm: Record<string, any> = {
  tl: 0,
  tc: 0,
  tr: 0,
  cl: 0,
  cr: 0,
  bl: 0,
  br: 0,
  minDim
}
const resizerRight: Record<string, any> = {
  ...resizerBtm,
  cr: 1,
  bc: 0,
  currentUnit,
  minDim,
  step,
  keyWidth: 'flex-basis'
}

const rowAttr = {
  // class: clsRow,
  'data-gjs-droppable': 'false',
  'data-gjs-resizable': resizerBtm,
  'data-gjs-name': 'Row'
}

const colAttr: Record<string, any> = {
  // class: clsCell,
  // 'data-gjs-draggable': `.${clsRow}`,
  'data-gjs-resizable': resizerRight,
  'data-gjs-name': 'Cell',
  'data-gjs-unstylable': 'width',
  'data-gjs-stylable-require': 'flex-basis'
}

const attrsToString = (attrs: Record<string, any>): string => {
  const result = []

  for (const key in attrs) {
    let value = attrs[key]
    const toParse = value instanceof Array || value instanceof Object
    value = toParse ? JSON.stringify(value) : value
    // @ts-ignore nothing is sett to never its just a problem wih tsconfig
    result.push(`${key}=${toParse ? `'${value}'` : `'${value}'`}`)
  }

  return result.length ? ` ${result.join(' ')}` : ''
}

const attrsRow = attrsToString(rowAttr)
const attrsCell = attrsToString(colAttr)
const commonBlockProps = {
  category,
  select: true
}

const blocks = [
  {
    ...commonBlockProps,
    label: '1 block',
    content: `<div ${attrsRow} style="${styleRow}">
      <div ${attrsCell} style="${styleWithFlexForInner(1)}"></div>
    </div>`
  },
  {
    ...commonBlockProps,
    label: '2 block',
    content: `<div ${attrsRow} style="${styleRow}">
      <div ${attrsCell} style="${styleWithFlexForInner(2)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(2)}"></div>
    </div>`
  },
  {
    ...commonBlockProps,
    label: '3 block',
    content: `<div ${attrsRow} style="${styleRow}">
      <div ${attrsCell} style="${styleWithFlexForInner(3)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(3)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(3)}"></div>
    </div>`
  },
  {
    ...commonBlockProps,
    label: '4 block',
    content: `<div ${attrsRow} style="${styleRow}">
      <div ${attrsCell} style="${styleWithFlexForInner(4)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(4)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(4)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(4)}"></div>
    </div>`
  },
  {
    ...commonBlockProps,
    label: '5 block',
    content: `<div ${attrsRow} style="${styleRow}">
      <div ${attrsCell} style="${styleWithFlexForInner(5)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(5)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(5)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(5)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(5)}"></div>
    </div>`
  },
  {
    ...commonBlockProps,
    label: '6 block',
    content: `<div ${attrsRow} style="${styleRow}">
      <div ${attrsCell} style="${styleWithFlexForInner(6)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(6)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(6)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(6)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(6)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(6)}"></div>
    </div>`
  },
  {
    ...commonBlockProps,
    label: '7 block',
    content: `<div ${attrsRow} style="${styleRow}">
      <div ${attrsCell} style="${styleWithFlexForInner(7)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(7)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(7)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(7)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(7)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(7)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(7)}"></div>
    </div>`
  },
  {
    ...commonBlockProps,
    label: '8 block',
    content: `<div ${attrsRow} style="${styleRow}">
      <div ${attrsCell} style="${styleWithFlexForInner(8)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(8)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(8)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(8)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(8)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(8)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(8)}"></div>
      <div ${attrsCell} style="${styleWithFlexForInner(8)}"></div>
    </div>`
  }
]

export default blocks
