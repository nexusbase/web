import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../ScreenSafeAreaView';
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkspacesStart } from '../../actions/workspaces';
import { RootStackParamList } from '../../types/navigation';
import RootStore from '../../types/store/root'

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

const LoadingIndicator = (props) => (
  <View style={props.style}>
    <Spinner size='small'/>
  </View>
);

type Props = StackScreenProps<RootStackParamList, 'AddWorkspace'>;

export default ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const { isNew, workspace } = useSelector((state: RootStore) => ({
    workspace: state.workspaces.workspace,
    isNew: state.workspaces.isNew,
  }));
  
  useEffect(() => {
    if(isNew && workspace) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'WorkspaceHome', params: {id: workspace.id} }],
      });
    }
  }, [isNew, workspace]);

  return (
    <ScreenSafeAreaView>
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          Add workspace
        </Text>
        <Input
          placeholder='Place your Text'
          value={name}
          onChangeText={nextValue => setName(nextValue)}
        />
        <Button
          accessoryLeft={StarIcon}
          onPress={() => dispatch(createWorkspacesStart(name))}
        >Add</Button>
      </Layout>
    </ScreenSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});
