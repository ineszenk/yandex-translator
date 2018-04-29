import Request from 'superagent';
import translate from 'translate';
import config from '../config';

translate.engine = config.engine;
translate.key = config.yandexAPI;

function buildErrorObject(e, res) {
  let err = e;
  if (!e && res.body.errors) {
    err = new Error(res.body.errors.message);
    err.rawJson = res.body.errors;
  }
  return err;
}
function getTrans(cb, sourceText, targetLang) {
  translate(sourceText, targetLang).then((text) => {
    cb(text);
  });
}

function getLangs(cb) {
  const url = `${config.endpoint}/getLangs?ui=en&key=${config.yandexAPI}`;
  Request.get(url).end((e, res) => {
    const err = buildErrorObject(e, res);
    cb(err, res.body.langs);
  });
}

function speakTrans(text, lang) {
  const msg = new SpeechSynthesisUtterance();
  msg.rate = 1;
  msg.pitch = 1;
  msg.text = text;
  msg.lang = lang;
  speechSynthesis.speak(msg);
}

export {
  getTrans,
  getLangs,
  speakTrans,
};
