'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { leadFormSchema } from '@/lib/validations/lead-form';
import { submitLead, resendVerification } from '@/lib/data/leads';
import { LeadFormData } from '@/lib/definitions/types';
import { z } from 'zod';

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
}

type SubmitStatus =
    | { type: 'success'; message: string }
    | { type: 'error'; message: string }
    | { type: 'verify'; message: string; email: string }
    | { type: null; message: string };

export function LeadForm({ source }: { source: string }) {
    const [formData, setFormData] = useState<LeadFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: null, message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }

        if (submitStatus.type) {
            setSubmitStatus({ type: null, message: '' });
        }
    };

    const validateForm = (): boolean => {
        try {
            leadFormSchema.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: FormErrors = {};
                error.issues.forEach((issue) => {
                    const field = issue.path[0] as keyof FormErrors;
                    newErrors[field] = issue.message;
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const response = await submitLead(formData, source);

            if (response.success && response.data?.requiresVerification) {
                setSubmitStatus({
                    type: 'verify',
                    message: `We've sent a verification link to ${formData.email}. Please check your inbox and click the link to finish signing up.`,
                    email: formData.email,
                });

                return;
            }

            if (response.success) {
                setSubmitStatus({
                    type: 'success',
                    message: response.message || 'Thank you! We’ll be in touch soon.',
                });

                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                });
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: response.message || 'Something went wrong. Please try again.',
                });
            }
        } catch {
            setSubmitStatus({
                type: 'error',
                message: 'Failed to submit. Please check your connection and try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendVerification = async () => {
        if (submitStatus.type !== 'verify') return;
        ;

        try {
            await resendVerification(submitStatus.email);
            alert('Verification email resent. Please check your inbox.');
        } catch {
            alert('Failed to resend verification email. Please try again.');
        }
    };

    return (
        <div className="w-full">
            {/* Verification Required State */}
            {submitStatus.type === 'verify' && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 text-sm text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-200 space-y-4">
                    <p className="text-lg font-semibold">Verify your email address</p>

                    <p>
                        We’ve sent a verification link to:
                        <span className="block mt-1 font-semibold">{submitStatus.email}</span>
                    </p>

                    <p>
                        Please check your inbox and click the link to complete your signup.
                        If you don’t see it, check your spam folder.
                    </p>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleResendVerification}
                    >
                        Resend verification email
                    </Button>
                </div>
            )}

            {/* Normal Form */}
            {submitStatus.type !== 'verify' && (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            error={errors.firstName}
                            disabled={isSubmitting}
                            required
                        />
                        <Input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            error={errors.lastName}
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <Input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        disabled={isSubmitting}
                        required
                    />

                    <Input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        error={errors.phoneNumber}
                        disabled={isSubmitting}
                        required
                    />

                    {submitStatus.type && (
                        <div
                            className={`rounded-lg p-4 text-sm ${submitStatus.type === 'success'
                                ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
                                : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
                                }`}
                        >
                            {submitStatus.message}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Join Our Email List'}
                    </Button>

                    <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
                        By submitting this form, you agree to receive email communications from us.
                    </p>
                </form>
            )}
        </div>
    );
}
