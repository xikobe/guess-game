'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema } from './schema';
import { useState } from 'react';

type UserFormProps = {
    onSubmit: (user: string) => void;
};

export function UserForm({ onSubmit }: UserFormProps) {
    const [isUserFormVisible, setIsUserFormVisible] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
        },
    });

    function handleOnSubmit(values: z.infer<typeof formSchema>) {
        onSubmit(values.username);
    }

    function handleShowUserForm() {
        setIsUserFormVisible(true);
    }

    if (!isUserFormVisible) {
        return (
            <div data-testid="wait-user">
                <Button onClick={handleShowUserForm}>Sign up to play</Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-4 gap-4" data-testid="wait-user">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleOnSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Satoshi" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Sign up</Button>
                </form>
            </Form>
        </div>
    );
}
