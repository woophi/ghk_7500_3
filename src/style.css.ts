import { style } from '@vanilla-extract/css';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});

const filterSlide = style({
  width: 'auto',
});

const box = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  borderRadius: '24px',
  backgroundColor: '#F3F3F3',
  gap: '1rem',
});

const rowImg = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});
const rowT = style({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '8px',
});
const row8 = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const btmContent = style({
  padding: 0,
});

const sheetContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '8px 16px 24px',
});

const sheetQuestionCard = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  padding: '12px 0 0',
  borderRadius: '24px',
  backgroundColor: 'transparent',
});

const sheetQuestionCopy = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  minWidth: 0,
});

const sheetStakeRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '20px',
});

const sheetCounterButton = style({
  width: '48px',
  height: '48px',
  border: 'none',
  borderRadius: '999px',
  backgroundColor: '#F3F4F7',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

const sheetStakeCenter = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  flex: 1,
});

const sheetQuickTags = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '12px',
});

const sheetSubmitButton = style({
  marginTop: '8px',
});

export const appSt = {
  bottomBtn,
  container,
  filterSlide,
  box,
  rowImg,
  rowT,
  row8,
  btmContent,
  sheetContent,
  sheetQuestionCard,
  sheetQuestionCopy,
  sheetStakeRow,
  sheetCounterButton,
  sheetStakeCenter,
  sheetQuickTags,
  sheetSubmitButton,
};
