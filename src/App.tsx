import { BottomSheet } from '@alfalab/core-components/bottom-sheet/cssm';
import { Button } from '@alfalab/core-components/button/cssm';
import { Gap } from '@alfalab/core-components/gap/cssm';
import { Tag } from '@alfalab/core-components/tag/cssm';
import { Typography } from '@alfalab/core-components/typography/cssm';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ExpandableText } from './expand/ExpandableText';
import { useStocksData } from './hooks/useStocksData';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { QuestionItem } from './types';
const CATEGORY_ALL = 'Все';

type CategoryPillProps = {
  category: string;
  isActive: boolean;
  onClick: () => void;
};

const CategoryPill = ({ category, isActive, onClick }: CategoryPillProps) => {
  return (
    <Tag
      size={32}
      view={isActive ? 'filled' : 'transparent'}
      onClick={onClick}
      style={{ backgroundColor: isActive ? '#000000' : undefined }}
    >
      <Typography.Text tag="span" view="primary-small" color={isActive ? 'primary-inverted' : 'secondary'}>
        {category}
      </Typography.Text>
    </Tag>
  );
};

const answerLabels = {
  yes: 'Да',
  no: 'Нет',
} as const;

const quickStakeValues = [100, 200, 300, 500] as const;

const LINK =
  'alfabank://sdui_screen?screenName=InvestmentLongread&fromCurrent=true&shouldUseBottomSafeArea=true&endpoint=v1/invest-main-screen-view/investment-longread/98955%3flocation=AM%26campaignCode=GH';

export const App = () => {
  const [showBs, setShowBs] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(0);
  const { questions } = useStocksData();
  const [answerData, setAnswerData] = useState<{
    question: QuestionItem;
    answer: 'yes' | 'no';
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState(CATEGORY_ALL);
  const categories = [CATEGORY_ALL, ...new Set(questions.map(({ category }) => category))];
  const filteredQuestions =
    activeCategory === CATEGORY_ALL ? questions : questions.filter(({ category }) => category === activeCategory);

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  const setStake = (value: number) => {
    setStakeAmount(Math.max(0, value));
  };

  const submit = () => {
    window.location.replace(LINK);
  };

  if (answerData) {
    const selectedCoeff = answerData.answer === 'yes' ? answerData.question.yesX : answerData.question.noX;
    const profit = Math.round(stakeAmount * selectedCoeff);

    return (
      <>
        <div className={appSt.container} style={{ backgroundColor: '#F2F3F5' }}>
          <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="medium" font="system" weight="semibold">
            {answerData.question.question}
          </Typography.TitleResponsive>

          <div>
            <Typography.Text view="primary-small" color="primary">
              Объём, ₽
            </Typography.Text>
            <Typography.TitleResponsive tag="h3" view="small" font="system" weight="semibold">
              {answerData.question.volume.toLocaleString('ru-RU')}
            </Typography.TitleResponsive>
          </div>
        </div>
        <div className={appSt.container}>
          <Typography.TitleResponsive tag="h3" view="small" font="system" weight="semibold" style={{ marginTop: '1rem' }}>
            Правила
          </Typography.TitleResponsive>

          <ExpandableText lines={5} view="primary-medium" color="primary">
            {answerData.question.rules}
          </ExpandableText>
        </div>
        <Gap size={96} />

        <div className={appSt.bottomBtn}>
          <Button
            block
            size={56}
            style={{ backgroundColor: '#8EE29C' }}
            view="secondary"
            onClick={() => {
              setAnswerData({ question: answerData.question, answer: 'yes' });
              setShowBs(true);
            }}
          >
            Да {answerData.question.yesPercentage}%
          </Button>
          <Button
            block
            size={56}
            style={{ backgroundColor: '#FCB1A7' }}
            view="secondary"
            onClick={() => {
              setAnswerData({ question: answerData.question, answer: 'no' });
              setShowBs(true);
            }}
          >
            Нет {answerData.question.noPercentage}%
          </Button>
        </div>
        <BottomSheet
          open={showBs}
          onClose={() => {
            setShowBs(false);
          }}
          contentClassName={appSt.btmContent}
        >
          <div className={appSt.sheetContent}>
            <div className={appSt.sheetQuestionCard}>
              <img src={answerData.question.img} width={50} height={50} alt={answerData.question.question} />

              <div className={appSt.sheetQuestionCopy}>
                <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
                  {answerData.question.question}
                </Typography.Text>

                <Tag
                  size="xxs"
                  view="filled"
                  shape="rectangular"
                  style={{ backgroundColor: answerData.answer === 'yes' ? '#8EE29C' : '#FCB1A7', width: 'min-content' }}
                >
                  <Typography.Text tag="span" view="primary-small" color="primary">
                    {answerLabels[answerData.answer]}
                  </Typography.Text>
                </Tag>
              </div>
            </div>

            <div className={appSt.sheetStakeRow}>
              <button type="button" className={appSt.sheetCounterButton} onClick={() => setStake(stakeAmount - 100)}>
                <Typography.Text tag="span" view="primary-medium" weight="medium">
                  −
                </Typography.Text>
              </button>

              <div className={appSt.sheetStakeCenter}>
                <Typography.TitleResponsive tag="h2" view="large" font="system" weight="semibold">
                  {stakeAmount} ₽
                </Typography.TitleResponsive>
                <Typography.Text tag="p" view="primary-medium" color="positive" defaultMargins={false}>
                  Выигрыш {profit} ₽
                </Typography.Text>
              </div>

              <button type="button" className={appSt.sheetCounterButton} onClick={() => setStake(stakeAmount + 100)}>
                <Typography.Text tag="span" view="primary-medium" weight="medium">
                  +
                </Typography.Text>
              </button>
            </div>

            <div className={appSt.sheetQuickTags}>
              {quickStakeValues.map(value => {
                const isActive = stakeAmount === value;

                return (
                  <Tag
                    key={value}
                    size="xxs"
                    view="filled"
                    onClick={() => setStake(value)}
                    style={{ backgroundColor: isActive ? '#0E0E0E' : '#F1F3F5' }}
                  >
                    <Typography.Text tag="span" view="primary-medium" color={isActive ? 'primary-inverted' : 'primary'}>
                      +{value}
                    </Typography.Text>
                  </Tag>
                );
              })}
            </div>

            <Button
              block
              size={56}
              view="primary"
              className={appSt.sheetSubmitButton}
              disabled={stakeAmount === 0}
              onClick={submit}
            >
              Поставить кешбэк
            </Button>
          </div>
        </BottomSheet>
      </>
    );
  }

  return (
    <>
      <div className={appSt.container}>
        <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="large" font="system" weight="semibold">
          Ставьте кешбэк и зарабатывайте
        </Typography.TitleResponsive>

        <div>
          <Swiper slidesPerView="auto" spaceBetween={8}>
            {categories.map(category => (
              <SwiperSlide key={category} className={appSt.filterSlide}>
                <CategoryPill
                  category={category}
                  isActive={category === activeCategory}
                  onClick={() => setActiveCategory(category)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {filteredQuestions.map(question => (
          <div key={question.question} className={appSt.box}>
            <div className={appSt.rowImg}>
              <img src={question.img} width={48} height={48} alt={question.question} />
              <Typography.Text view="primary-medium" color="primary">
                {question.question}
              </Typography.Text>
            </div>

            <div className={appSt.rowT}>
              <Typography.TitleResponsive tag="h2" view="large" font="system" weight="medium">
                {question.yesPercentage > question.noPercentage ? question.yesPercentage : question.noPercentage}%
              </Typography.TitleResponsive>
              <Typography.Text view="primary-medium" color="primary">
                выбрали {question.yesPercentage > question.noPercentage ? 'да' : 'нет'}
              </Typography.Text>
            </div>

            <div className={appSt.row8}>
              <Button
                block
                size={40}
                style={{ backgroundColor: '#8EE29C' }}
                view="secondary"
                onClick={() => {
                  setAnswerData({ question, answer: 'yes' });
                }}
              >
                Да
              </Button>
              <Button
                block
                size={40}
                style={{ backgroundColor: '#FCB1A7' }}
                view="secondary"
                onClick={() => {
                  setAnswerData({ question, answer: 'no' });
                }}
              >
                Нет
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Gap size={96} />
    </>
  );
};
