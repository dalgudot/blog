export const addInlineCodeBlock = (
  inputHtml: string,
  setTempPostHtmlData: (inputHtml: string) => void,
  setPostHtmlData: (inputHtml: string) => void
) => {
  const countBacktick = inputHtml.match(/`/g)?.length;
  const updateInlineBlock = (inputHtml: string) => {
    setTempPostHtmlData(inputHtml);
    setPostHtmlData(inputHtml);
  };

  if (countBacktick === 2) {
    const isContinuousBacktick: boolean = inputHtml.includes('``');

    if (isContinuousBacktick) {
      // 2개 연속(``)이면 빈 inline Code Block 생성
      const emptyCodeInlineBlock = inputHtml.replace(
        '``',
        '<code>&nbsp</code>&nbsp'
      );

      updateInlineBlock(emptyCodeInlineBlock);
    } else {
      // 첫 번째 `는 <code>로 두 번째 `는 </code>로!
      const addBacktick = inputHtml
        .replace('`', '<code class="inline__code__block">')
        .replace(
          '`',
          `</code>`
          // `</code>&nbsp`
          // &nbsp로 코드 블럭 벗어나기
        );

      updateInlineBlock(addBacktick);
    }
  }
};
