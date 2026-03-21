import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input, InputField } from '@/components/ui/input';
import { View } from 'react-native';

interface CreateWorkoutFormProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function CreateWorkoutForm({
  value,
  onChangeText,
  onSubmit,
  onCancel,
}: CreateWorkoutFormProps) {
  return (
    <Card className="mb-5 p-4">
      <Input className="mb-3">
        <InputField
          placeholder="Workout name"
          value={value}
          onChangeText={onChangeText}
          autoFocus
          onSubmitEditing={onSubmit}
        />
      </Input>
      <View className="flex-row gap-3">
        <Button className="flex-1" variant="outline" onPress={onCancel}>
          <ButtonText>Cancel</ButtonText>
        </Button>
        <Button className="flex-1" onPress={onSubmit}>
          <ButtonText>Create</ButtonText>
        </Button>
      </View>
    </Card>
  );
}
