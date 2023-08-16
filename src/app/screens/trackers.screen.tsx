import {FlatList, View} from 'react-native';
import {useCreateTracker, useTrackers} from '../../state/tracker.state';
import {ScreenLayout} from '../layouts/screen.layout';
import {Button, Dialog, FAB, List, Portal, TextInput} from 'react-native-paper';
import {useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {
  CreateTrackerData,
  CreateTrackerSchema,
} from '../../schemas/create-tracker.schema';
import {valibotResolver} from '@hookform/resolvers/valibot';
import {Tracker} from '../../entities/tracker';

export const TrackersScreen = () => {
  const {trackers} = useTrackers();
  const [isNewTrackerDialogVisible, setIsNewTrackerDialogVisible] =
    useState(false);
  const {createTrackerTrigger} = useCreateTracker();
  const {control, handleSubmit} = useForm<CreateTrackerData>({
    resolver: valibotResolver(CreateTrackerSchema),
  });

  const onNewTrackerDialogDismiss = () => setIsNewTrackerDialogVisible(false);
  const newTrackerSubmitHandler: SubmitHandler<CreateTrackerData> = input => {
    createTrackerTrigger(new Tracker(input.name, input.description));
  };

  return (
    <>
      <ScreenLayout>
        <FlatList
          data={trackers}
          renderItem={({item: tracker}) => (
            <List.Item title={tracker.name} description={tracker.description} />
          )}
          keyExtractor={({id}, index) =>
            id ? id.toString() : index.toString()
          }
        />
      </ScreenLayout>

      <View className="absolute bottom-0 right-0 p-5">
        <FAB icon={'plus'} onPress={() => setIsNewTrackerDialogVisible(true)} />
      </View>

      <Portal>
        <Dialog
          visible={isNewTrackerDialogVisible}
          onDismiss={onNewTrackerDialogDismiss}>
          <Dialog.Title>New Tracker</Dialog.Title>
          <Dialog.Content>
            <Controller
              control={control}
              name="name"
              render={({field: {onChange, ...rest}}) => (
                <TextInput
                  {...rest}
                  onChangeText={onChange}
                  mode="outlined"
                  label={'Name'}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({field: {onChange, ...rest}}) => (
                <TextInput
                  {...rest}
                  onChangeText={onChange}
                  mode="outlined"
                  label={'Description'}
                />
              )}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onNewTrackerDialogDismiss}>Cancel</Button>
            <Button onPress={handleSubmit(newTrackerSubmitHandler)}>
              Create
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
