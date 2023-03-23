import { notification } from "antd";

const Toaster = (message, type) => {
    // const [api, contextHolder] = notification.useNotification();
  if (process.browser) {
    return notification.open({
      message: "Notification",
      description: message,
      id:"444",
      type:type
      // onClick: () => {
      //   console.log('Notification Clicked!');
      // },
    })
  }
};

export default Toaster;
