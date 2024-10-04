import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useRecoilState } from 'recoil';
import { newAlbumTitleState } from '../store/store';

interface TextInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitEditing: () => void;
}

export default ({ isOpen, onClose, onSubmitEditing }: TextInputModalProps) => {
  const [newAlbumTitle, setNewAlbumTitle] = useRecoilState(newAlbumTitleState);

  return (
    <Modal
      animationType='fade'
      transparent
      visible={isOpen}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>
            <SafeAreaView
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
              }}
            >
              <TextInput
                autoFocus
                style={{ width: '100%', padding: 10, borderWidth: 0.5, borderColor: 'lightgrey' }}
                placeholder='앨범명을 입력해주세요'
                value={newAlbumTitle}
                onChangeText={setNewAlbumTitle}
                onSubmitEditing={onSubmitEditing}
              />
            </SafeAreaView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
