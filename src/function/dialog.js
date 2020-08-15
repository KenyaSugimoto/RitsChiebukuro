export async function dialog(vm, message) {
  let response = ''
  await vm.$dialog.confirm(
    message,
    {
      okText: 'はい',
      cancelText: 'キャンセル',
      html: true,
    }
  ).then(() => {
    response = 'OK';
  }).catch(() => {
    //
  });

  return response;
}