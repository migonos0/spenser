import {FlatList, View} from 'react-native';
import {useCreateTracker, useTrackers} from '../../state/tracker.state';
import {ScreenLayout} from '../layouts/screen.layout';
import {Button, Dialog, FAB, Portal, TextInput} from 'react-native-paper';
import {useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {
  CreateTrackerData,
  CreateTrackerSchema,
} from '../../schemas/create-tracker.schema';
import {valibotResolver} from '@hookform/resolvers/valibot';
import {Tracker} from '../../entities/tracker';
import {TrackerItem} from '../components/tracker-item';
import {ErrorText} from '../components/error-text';
import {LOCALE} from '../../constants/locale';

export const TrackersScreen = () => {
  const {trackers} = useTrackers();
  const [isNewTrackerDialogVisible, setIsNewTrackerDialogVisible] =
    useState(false);
  const {createTrackerTrigger} = useCreateTracker();
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<CreateTrackerData>({
    resolver: valibotResolver(CreateTrackerSchema),
  });

  const onNewTrackerDialogDismiss = () => {
    setIsNewTrackerDialogVisible(false);
    reset();
  };
  const newTrackerSubmitHandler: SubmitHandler<CreateTrackerData> = input =>
    createTrackerTrigger(new Tracker(input.name, input.description), {
      onSuccess: onNewTrackerDialogDismiss,
    });

  return (
    <>
      <ScreenLayout>
        <FlatList
          data={trackers}
          renderItem={({item: tracker}) => (
            <TrackerItem tracker={tracker} class="border-0 border-b-2" />
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
          <Dialog.Title>
            {LOCALE.screens.trackers.dialogs.createTracker.title}
          </Dialog.Title>
          <Dialog.Content>
            <Controller
              control={control}
              name="name"
              render={({field: {onChange, ...rest}}) => (
                <TextInput
                  {...rest}
                  onChangeText={onChange}
                  label={
                    LOCALE.screens.trackers.dialogs.createTracker.inputs.name
                  }
                  mode="flat"
                />
              )}
            />
            <ErrorText error={errors.name?.message} />

            <Controller
              control={control}
              name="description"
              render={({field: {onChange, ...rest}}) => (
                <TextInput
                  {...rest}
                  onChangeText={onChange}
                  label={
                    LOCALE.screens.trackers.dialogs.createTracker.inputs
                      .description
                  }
                />
              )}
            />
            <ErrorText error={errors.description?.message} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onNewTrackerDialogDismiss}>
              {LOCALE.common.dismiss}
            </Button>
            <Button onPress={handleSubmit(newTrackerSubmitHandler)}>
              {LOCALE.common.create}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
