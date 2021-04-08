import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Layout,
  Text,
} from '@ui-kitten/components';
import { useIsFocused } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { getViewsStart, getViewStart } from '../../actions/views';
import { getCollectionStart } from '../../actions/collections';
import { getItemsStart } from '../../actions/items';
import ScreenSafeAreaView from '../ScreenSafeAreaView';
import ViewFactory from '../factories/ViewFactory';

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [viewId, setViewId] = useState(null);
  const collectionId = route.params.id;
  const { workspace, collection, views, view } = useSelector((state) => ({
    workspace: state.workspaces.workspace,
    collection: state.collections.collection,
    lastWorkspace: state.app.lastWorkspace,
    views: state.views.views,
    view: state.views.view,
  }));

  useEffect(() => {
    if (isFocused) {
      if (!collection || collection.id != collectionId){
        dispatch(getCollectionStart(collectionId));
      }
      if (collection && !views) {
        dispatch(getViewsStart());
        dispatch(getItemsStart());
      }
    }
  }, [collectionId, collection, isFocused]);

  useEffect(() => {
    if (!viewId && views) {
      setViewId(views[0].id);
    }

    if (viewId && !view) {
      dispatch(getViewStart(viewId));
    }
  }, [views, viewId]);

  if (!collection) {
    return (
      <ScreenSafeAreaView>
        <Layout style={styles.container}>
          <Text style={styles.text} category="h1">
            Loading collection...
          </Text>
        </Layout>
      </ScreenSafeAreaView>
    );
  }

  return (
    <ScreenSafeAreaView>
      <Layout style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text} category="h1">
              {collection.name}
            </Text>
          </View>
          <View>  
            <ViewFactory />
          </View>
      </Layout>
    </ScreenSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginLeft: 30
  },
  text: {
  },
  likeButton: {
    marginVertical: 16,
  },
});