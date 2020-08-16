export async function dialog(vm, message, isHtml) {
  let response = ''
  await vm.$dialog.confirm(
    message,
    {
      okText: 'はい',
      cancelText: 'キャンセル',
      html: isHtml ? true : false,
    }
  ).then(() => {
    response = 'OK';
  }).catch(() => {
    //
  });

  return response;
}