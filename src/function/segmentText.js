export function segmentText(text) {
  const TinySegmenter = require('tiny-segmenter');
  const tinySegmenter = new TinySegmenter();
  let segments = tinySegmenter.segment(text);
  segments = segments.map(function(segment) {
    /* eslint no-irregular-whitespace: ["error", {"skipRegExps": true}] */
    // ひらがなチェック (3文字以上のひらがなはキーワードとして扱う)
    if (!segment.match(/^[ぁ-んー　 ]*$/) || segment.length >= 3) {
      return {stringValue: segment};
    }
  });
  segments = segments.filter(segment => typeof(segment) !== 'undefined');

  return segments;
}
