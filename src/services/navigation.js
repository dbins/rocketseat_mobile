import { NavigationActions } from "react-navigation";

let navigator;

export function setNavigator(ref) {
  navigator = ref;
}

export function goBack() {
  navigator.dispatch(NavigationActions.back());
}

export function navigate(routeName, params) {
  navigator.dispatch(NavigationActions.navigate({ routeName, params }));
}
