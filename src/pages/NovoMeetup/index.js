import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  View,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  CameraRoll,
  PermissionsAndroid,
  ActivityIndicator,
  Dimensions,
  Alert,
  ScrollView,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import PropTypes from "prop-types";

import Button from "../../components/Button";
import CheckBox from "../../components/Checkbox";
import FormInput from "../../components/FormInput";
import Header from "../../components/Header";
import PreferencesActions from "../../store/ducks/preferences";
import UserMeetupsActions from "../../store/ducks/userMeetups";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

import {
  Container,
  SectionTitle,
  ImageUploadContainer,
  PictureIcon,
  Screen,
  Label,
  ButtonContainer
} from "./styles";

const TabIcon = ({ tintColor }) => (
  <Icon name="plus-square" size={20} color={tintColor} />
);

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

var width = Dimensions.get("window").width; //full width
var largura_janela = width;
var thumb = width / 3;

class NovoMeetup extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon
  };

  static propTypes = {
    preferences: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        type: PropTypes.string
      })
    ).isRequired,
    loadPreferencesRequest: PropTypes.func.isRequired,
    saveNewMeetupRequest: PropTypes.func.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
  };

  state = {
    title: "",
    description: "",
    datetime: "",
    location: "",
    checkboxItems: {},
    view_calendar: false,
    gallery: false,
    data: "Quando o meetup vai acontecer?",
    photos: [],
    imageURL: ""
  };

  componentDidMount() {
    const { loadPreferencesRequest } = this.props;
    loadPreferencesRequest();
  }

  onItemClick = itemId => {
    const { checkboxItems } = this.state;

    if (!Object.keys(checkboxItems).length) {
      const { preferences } = this.props;
      preferences.forEach(item => {
        checkboxItems[item.id] = { isChecked: false };
      });
    }

    checkboxItems[itemId].isChecked = !checkboxItems[itemId].isChecked;

    this.setState({ checkboxItems });
  };

  saveMeetup = () => {
    const { saveNewMeetupRequest, user } = this.props;
    const {
      title,
      description,
      datetime,
      location,
      checkboxItems,
      imageURL
    } = this.state;
    const preferences = [];
    let continuar = true;
    let mensagem = "";

    Object.keys(checkboxItems).forEach(key => {
      if (checkboxItems[key].isChecked) {
        preferences.push(key);
      }
    });

    if (title == "") {
      continuar = false;
      mensagem += "Por favor informe o título!\n";
    }
    if (description == "") {
      continuar = false;
      mensagem += "Por favor informe a descrição!\n";
    }
    if (datetime == "") {
      continuar = false;
      mensagem += "Qual é a data do meetup?\n";
    }
    if (location == "") {
      continuar = false;
      mensagem += "Onde vai ser realizado o meetup?\n";
    }
    if (imageURL == "") {
      continuar = false;
      mensagem += "Por favor mande uma imagem!\n";
    }
    if (preferences.length == 0) {
      continuar = false;
      mensagem += "O meetup precisa ter pelo menos 1 tema!\n";
    }

    if (continuar) {
      const data = {
        title,
        description,
        datetime,
        owner_id: user.id,
        location,
        imageURL,
        preferences
      };
      this.setState({ data: "Quando o meetup vai acontecer?" });
      saveNewMeetupRequest(data);
      this.setState({
        title: "",
        description: "",
        datetime: "",
        location: "",
        imageURL: "",
        checkboxItems: {}
      });
    } else {
      Alert.alert("NOVO MEETUP", mensagem, [{ text: "FECHAR" }], {
        cancelable: false
      });
    }
  };

  openModal() {
    this.setState({ view_calendar: true });
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
      datetime: moment(date).format("YYYY-MM-DD"),
      data: moment(date).format("DD/MM/YYYY")
    });

    this.closeModal();
  }

  closeModal() {
    this.setState({ view_calendar: false });
  }

  closeModal2() {
    this.setState({ gallery: false });
  }

  imagemSelecionada = async caminho => {
    this.setState({ imageURL: caminho });
    this.closeModal2();
  };

  checkCameraRollPermission = async () => {
    let retorno = false;
    try {
      retorno = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
    } catch (err) {
      console.tron.log(err);
    }
    return retorno;
  };

  requestCameraRollPermission = async () => {
    //NEVER_ASK_AGAIN - LIBERAR NO APARELHO
    let retorno = false;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "MeetApp quer sua permissão...",
          message:
            "Precisamos de sua aprovação para selecionar imagens de seu dispositivo."
        }
      );
      console.tron.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        retorno = true;
      } else {
        //console.log("NEGADO");
      }
    } catch (err) {
      console.tron.log(err);
    }
    return retorno;
  };

  _handleButtonPress = async () => {
    //Precisa pedir permissão primeiro...
    let permissao = await this.checkCameraRollPermission();
    if (permissao) {
    } else {
      permissao = await this.requestCameraRollPermission();
    }

    if (permissao) {
      CameraRoll.getPhotos({
        first: 100
      })
        .then(r => {
          //console.tron.log(r);
          this.setState({ photos: r.edges });
          this.setState({ gallery: true });
        })
        .catch(err => {
          //Error Loading Images
          console.tron.log(err);
        });
    } else {
      alert("Você precisa autorizar para poder selecionar imagens!");
    }
  };

  render() {
    const {
      title,
      description,
      datetime,
      location,
      checkboxItems
    } = this.state;
    const { preferences, loading } = this.props;
    return (
      <Screen>
        <Header title="Novo Meetup" />
        <Container>
          <FormInput
            small
            label="Título"
            placeholder="Digite o título do novo meetup"
            value={title}
            onChangeText={value => this.setState({ title: value })}
          />
          <FormInput
            small
            label="Descrição"
            placeholder="Descreva seu meetup"
            value={description}
            onChangeText={value => this.setState({ description: value })}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity
            onPress={() => {
              this.openModal();
            }}
          >
            <Text style={{ color: "#FFFFFF" }}>{this.state.data}</Text>
          </TouchableOpacity>

          <Label>Imagem</Label>

          <TouchableOpacity
            onPress={() => {
              this._handleButtonPress();
            }}
          >
            <ImageUploadContainer>
              <PictureIcon name="camera" size={20} />
            </ImageUploadContainer>
          </TouchableOpacity>

          <FormInput
            label={"Localização"}
            small
            placeholder="Onde seu meetup irá acontecer?"
            value={location}
            onChangeText={value => this.setState({ location: value })}
          />

          <SectionTitle>Tema do meetup</SectionTitle>
          <CheckBox
            items={preferences}
            checkboxItems={checkboxItems}
            onItemClick={this.onItemClick}
          />

          <Button onPress={this.saveMeetup} loading={loading}>
            Salvar
          </Button>
          {this.props.error && (
            <Warning>Houve um erro ao tentar gravar o meetup!</Warning>
          )}
        </Container>

        <Modal
          visible={this.state.view_calendar}
          animationType={"slide"}
          onRequestClose={() => this.closeModal()}
        >
          <View>
            <CalendarPicker
              onDateChange={date => this.onDateChange(date)}
              startFromMonday={true}
              weekdays={["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"]}
              months={[
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro"
              ]}
              previousTitle="Anterior"
              nextTitle="Próximo"
              todayBackgroundColor="#e6ffe6"
              selectedDayColor="#66ff33"
              selectedDayTextColor="#000000"
            />
            <Button children={"Fechar"} onPress={() => this.closeModal()} />
          </View>
        </Modal>

        <Modal
          visible={this.state.gallery}
          animationType={"slide"}
          onRequestClose={() => this.closeModal2()}
        >
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap"
            }}
          >
            {this.state.photos.map((p, i) => {
              return (
                <TouchableHighlight
                  key={i}
                  onPress={() => this.imagemSelecionada(p.node.image)}
                >
                  <Image
                    key={i}
                    style={{
                      width: thumb,
                      height: thumb,
                      margin: 10
                    }}
                    source={{ uri: p.node.image.uri }}
                  />
                </TouchableHighlight>
              );
            })}
          </ScrollView>
          <Button
            children={"Fechar Janela"}
            onPress={() => this.closeModal2()}
          />
        </Modal>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  preferences: state.preferences.data,
  user: state.user,
  loading: state.userMeetups.loading,
  error: state.userMeetups.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...PreferencesActions,
      ...UserMeetupsActions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NovoMeetup);
